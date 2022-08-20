import {DatePicker,Button} from 'antd'
const { RangePicker } = DatePicker;
export default () => {
  return (
    <div>
      <RangePicker />

      <Button type="primary">Primary Button</Button>
    </div>
  )
}
