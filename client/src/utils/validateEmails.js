export default  emails => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const invalidEmails = emails
    .replace(/\s/g, '')   // Remove all white space characters (needs to be "greedy" to not stop after finding the first match)
    .replace(/,,+/g, ',')   // Remove any surplus commas from anywhere in the string
    .replace(/(^,|,$)/g, '')   // Remove a comma (if present) from the start or end of the string
    .split(',')
    .filter(email => !emailRegex.test(email));

  if (invalidEmails.length) {
    return `The following email addresses are invalid: ${invalidEmails.join(', ')}`;
  }
};