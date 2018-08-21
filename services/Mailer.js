const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('./../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    // The body of the email
    // 1st argument indicates that this is going to be html that will be in the body of the email
    // 2nd argument is the output of the email content
    this.body = new helper.Content('text/html', content);

    // Turns recipients into a sendgrid email object
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body);
    this.addClickTracking();

    // Adds the recipients object to register them to the email
    this.addRecipients();
  }

  formatAddresses(recipients) {
    return recipients(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking(){
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients(){
    const personalize = new helper.Personalization();

    this.recipients.forEach(recipient => {
      // Adds each email to the personalize object
      personalize.addTo(recipient);
    });

    // Given by the helper mail class
    this.addPersonalization(personalize);
  }
}

module.exports = Mailer;