import Mail from '~lib/Mail';

class ParcelCancellationMail {
  get key() {
    return 'ParcelCancellationMail';
  }

  async handle({ data }) {
    const { courier, recipient, product } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>?`,
      subject: 'Delivery canceled',
      template: 'cancellation',
      context: {
        courier: courier.name,
        recipient: recipient.name,
        product,
      },
    });
  }
}

export default new ParcelCancellationMail();
