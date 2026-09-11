import { useEffect, useState } from 'preact/hooks';
import { track } from '@/platform/analytics';
import { storage } from '@/platform/storage';
import {
  decideInstallPrompt,
  detectPlatform,
  isStandalone,
  loadInstallState,
  recordDismiss,
  recordInstalled,
  type InstallPlatform,
} from '@/platform/install';

/** The half of beforeinstallprompt we actually use. */
interface InstallEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface Props {
  mode: string;
  /** bumped by the timer each time a run finishes, so the prompt re-evaluates */
  completions: number;
}

export function InstallPrompt({ mode, completions }: Props) {
  const [deferred, setDeferred] = useState<InstallEvent | null>(null);
  const [platform, setPlatform] = useState<InstallPlatform>('none');
  const [standalone, setStandalone] = useState(true); // assume installed until proven otherwise
  const [gone, setGone] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const nav = window.navigator as Navigator & { standalone?: boolean };
    // navigator.platform is deprecated and lies under emulation; the UA is what
    // an iPad in desktop mode actually differs by.
    setPlatform(detectPlatform(nav.userAgent, /Mac/i.test(nav.userAgent), nav.maxTouchPoints ?? 0));
    setStandalone(
      isStandalone(window.matchMedia('(display-mode: standalone)').matches, nav.standalone),
    );

    // Base.astro catches beforeinstallprompt before we hydrate, so take whatever
    // it already has, then keep listening in case it arrives later.
    const stash = (): void => {
      const held = (window as Window & { __giInstallEvent?: InstallEvent | null }).__giInstallEvent;
      if (held) setDeferred(held);
    };
    stash();

    const onBip = (e: Event): void => {
      // Keep the browser's own mini-infobar out of the way; we ask at a better moment.
      e.preventDefault();
      setDeferred(e as InstallEvent);
    };
    const onInstalled = (): void => {
      recordInstalled(storage);
      setGone(true);
      track('pwa_installed', { mode, platform });
    };
    window.addEventListener('beforeinstallprompt', onBip);
    window.addEventListener('gi:installable', stash);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onBip);
      window.removeEventListener('gi:installable', stash);
      window.removeEventListener('appinstalled', onInstalled);
    };
    // Subscribe once: the handlers only read state that is set in this same effect.
  }, []);

  const stored = loadInstallState(storage);
  const visible =
    !gone &&
    decideInstallPrompt(
      {
        ...stored,
        completions: Math.max(stored.completions, completions),
        standalone,
        canPrompt: deferred !== null,
        platform,
      },
      Date.now(),
    ) === 'show';

  useEffect(() => {
    if (visible && !shown) {
      setShown(true);
      track('pwa_prompt_shown', { mode, platform, completions: stored.completions });
    }
  }, [visible, shown, mode, platform, stored.completions]);

  if (!visible) return null;

  const dismiss = (): void => {
    const next = recordDismiss(storage, Date.now());
    setGone(true);
    track('pwa_prompt_dismissed', {
      mode,
      platform,
      outcome: next.dismissCount >= 2 ? 'permanent' : 'snoozed',
    });
  };

  const install = async (): Promise<void> => {
    if (!deferred) return;
    track('pwa_prompt_accepted', { mode, platform });
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    setDeferred(null);
    setGone(true);
    if (outcome === 'accepted') {
      recordInstalled(storage);
      // The appinstalled listener reports the install itself.
    } else {
      // Declining the OS sheet is a softer no than closing our block; snooze it.
      recordDismiss(storage, Date.now());
      track('pwa_prompt_dismissed', { mode, platform, outcome: 'os_declined' });
    }
  };

  return (
    <aside class="install" aria-label="Install Go Intervals">
      <p class="install__title">Add it to the home screen.</p>
      {platform === 'ios' ? (
        <p class="install__body">
          Opens full screen, no browser bar. Tap Share, then <strong>Add to Home Screen</strong>.
        </p>
      ) : (
        <p class="install__body">Opens full screen, works offline, no browser bar.</p>
      )}
      <div class="install__actions">
        {platform !== 'ios' && (
          <button type="button" class="btn btn--primary" onClick={() => void install()}>
            Add
          </button>
        )}
        <button type="button" class="install__no" onClick={dismiss}>
          Not now
        </button>
      </div>
    </aside>
  );
}
