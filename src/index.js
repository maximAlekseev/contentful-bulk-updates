import { createClient } from 'contentful-management';
import { processEntries } from './utils';
import 'dotenv/config';

const {
  ACCESS_TOKEN,
  CF_SPACE_KEY,
  CF_ENV,
  BATCH_STEP
} = process.env

const init = async () => {
  const client = createClient({
    accessToken: ACCESS_TOKEN
  })

  const space = await client.getSpace(CF_SPACE_KEY);

  if (space) {
    const environment = await space.getEnvironment(CF_ENV);
    await processEntries(environment, Number(BATCH_STEP));
  } else {
    throw new Error('No space found!');
  }
}

void init();