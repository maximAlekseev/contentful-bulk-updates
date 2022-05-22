import Chalk from 'chalk/source';
import 'dotenv/config';

const {
  CF_ENTRY_TYPE,
  CF_LOCALE_KEY,
  ENTRY_TITLE_FIELD
} = process.env

export const updateEntries = async (entries, inputParams) => {
  for (const currentEntry of entries) {
    const currentEntryName = currentEntry?.fields?.[ENTRY_TITLE_FIELD]?.[CF_LOCALE_KEY];

    currentEntry.fields[inputParams.field] = {
      [CF_LOCALE_KEY]: inputParams.value
    }

    try {
      const updatedEntry = await currentEntry.update();
      console.log(Chalk.blue(`Entry ${currentEntryName} was updated.`));

      try {
        await updatedEntry.publish();
        console.log(Chalk.green(`Entry ${currentEntryName} published.`));
      } catch (e) {
        console.error(`Error while publishing ${currentEntryName}`, e.name, JSON.parse(e.message)?.message);
      }
    } catch (e) {
      if (e.name === 'UnknownField') {
        throw new Error(`Provided field id "${inputParams.field}" does not exists in ${CF_ENTRY_TYPE} entry.`);
      }

      console.error(`Error while updating ${currentEntryName}`, e.name, JSON.parse(e.message)?.message);
    }
  }
}