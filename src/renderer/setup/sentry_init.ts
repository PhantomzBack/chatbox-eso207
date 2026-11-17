import * as Sentry from '@sentry/react'
import { createSentryEventProcessor } from '@shared/utils/sentry_policy'
import { initSettingsStore, settingsStore } from '@/stores/settingsStore'
import { CHATBOX_BUILD_PLATFORM, CHATBOX_BUILD_TARGET, NODE_ENV } from '@/variables'
import platform from '../platform'

const processSentryEvent = createSentryEventProcessor({
  normalSampleRate: 0.1,
  source: 'renderer',
})

let sentryInitPromise: Promise<boolean> | undefined

async function initializeSentry(): Promise<boolean> {
  return false
}

export function initSentry(): Promise<boolean> {
  return Promise.resolve(false)
}

settingsStore.subscribe((settings, previousSettings) => {
  if (settings.allowReportingAndTracking === previousSettings.allowReportingAndTracking) {
    return
  }

  sentryInitPromise = undefined
  if (settings.allowReportingAndTracking) {
    void initSentry()
  } else {
    void Sentry.close(2000)
  }
})

export default Sentry
