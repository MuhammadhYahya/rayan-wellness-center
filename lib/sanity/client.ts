import 'server-only';

import { createClient } from '@sanity/client';

type SanityEnv = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  token?: string;
  writeToken?: string;
};

function getSanityEnv(): SanityEnv {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const apiVersion = process.env.SANITY_API_VERSION;
  const token = process.env.SANITY_READ_TOKEN;
  const writeToken = process.env.SANITY_WRITE_TOKEN;

  const missing = [
    !projectId && 'SANITY_PROJECT_ID',
    !dataset && 'SANITY_DATASET',
    !apiVersion && 'SANITY_API_VERSION',
  ].filter(Boolean);

  if (missing.length > 0) {
    throw new Error(
      `Missing Sanity environment variables: ${missing.join(', ')}. Add them to your local .env file before loading CMS-driven sections.`
    );
  }

  return {
    projectId: projectId as string,
    dataset: dataset as string,
    apiVersion: apiVersion as string,
    token,
    writeToken,
  };
}

export function getSanityClient() {
  const env = getSanityEnv();

  return createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    useCdn: true,
    token: env.token,
    perspective: 'published',
  });
}

export function getSanityWriteClient() {
  const env = getSanityEnv();

  if (!env.writeToken) {
    throw new Error(
      'Missing SANITY_WRITE_TOKEN. Add a write-capable Sanity token to enable review submissions.'
    );
  }

  return createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    useCdn: false,
    token: env.writeToken,
    perspective: 'published',
  });
}

export function hasSanityWriteToken() {
  return Boolean(process.env.SANITY_WRITE_TOKEN);
}
