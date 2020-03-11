import Mail from '~lib/Mail';

class AssignmentMail {
  get key() {
    return 'AssignmentMail';
  }

  async handle({ data }) {
    const { courier, recipient, product } = data;

    await Mail.sendMail({
      to: `${courier.name} <${courier.email}>?`,
      subject: 'New delivery assigned',
      template: 'assignment',
      context: {
        courier: courier.name,
        recipient: recipient.name,
        product,
      },
    });
  }
}

export default new AssignmentMail();
