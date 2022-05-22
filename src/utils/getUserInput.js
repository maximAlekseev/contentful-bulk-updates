import prompts from 'prompts';

export const getUserInput = async () => {
  const answers = await prompts(questions);

  if (Object.values(answers).length < questions.length) {
    throw new Error('All input parameters should be provided!');
  }

  return answers;
}

const questions = [
  {
    type: 'text',
    name: 'field',
    message: 'Enter entry filed name',
    validate: value => !value ? 'Field name is required!' : true
  },
  {
    type: 'multiselect',
    name: 'fieldType',
    message: 'Select field data type',
    choices: [
      { title: 'string', value: 'string' },
      { title: 'number', value: 'number' },
      { title: 'boolean', value: 'boolean' },
      { title: 'list', value: 'list' }
    ],
    min: 1,
    max: 1,
    hint: '- Space to select. Enter to submit',
    format: value => value?.[0]
  }, {
    type: prev => typeMap[prev],
    name: 'value',
    message: 'Enter entry filed value',
    validate: value => !value ? 'Field value is required!' : true,
    active: 'true',
    inactive: 'false'
  }
]

const typeMap = {
  string: 'text',
  number: 'number',
  boolean: 'toggle',
  list: 'list',
}