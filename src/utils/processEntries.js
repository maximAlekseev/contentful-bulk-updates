import Chalk from 'chalk/source';
import 'dotenv/config';
import { getUserInput } from './getUserInput';
import { updateEntries } from './updateEntries';

const {
  CF_ENTRY_TYPE,
  STARTING_SKIP,
} = process.env

const startingSkip = Number(STARTING_SKIP);

export const processEntries = async (env, limit) => {
  const inputParams = await getUserInput();

  console.log(Chalk.blue.bold(`=== Started processing ${CF_ENTRY_TYPE} entries. ===`));

  let skip = startingSkip;

  try {
    const hasNextBatch = skip === 0 || skip % limit === 0;

    while (hasNextBatch) {
      const entries = await env.getEntries({
        content_type: CF_ENTRY_TYPE,
        limit,
        skip
      })

      const entriesCount = entries.items.length;

      console.log(Chalk.red.bold(`=== Found entries: ${entriesCount} ===`));

      if (!entriesCount) break;

      skip += entriesCount;

      await updateEntries(entries.items, inputParams);
    }

    console.log(Chalk.green.bold(`=== Finished processing all ${CF_ENTRY_TYPE} entries. ===`));
  } catch (e) {
    console.log(Chalk.red.bold(`=== Error while processing all ${CF_ENTRY_TYPE} entries. ===`), e);
  }
}