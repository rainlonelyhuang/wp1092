import { Modal, Form, Input } from "antd"

const ChatModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()

  return (
    <Modal
      visible={visible}
      title="Create a new chat room"
      okText="Create" cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields()
          onCreate(values)
        }).catch((e) => {
          if (e.message) alert('Error: ' + e.message)
          else alert('Error: Please enter the name of the person to chat with!')
        })
      }}>
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item name="name" label="Name"
                   rules={[{
                     required: true,
                     message: "Error: Please enter the name of the person to chat with!"
                   }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChatModal