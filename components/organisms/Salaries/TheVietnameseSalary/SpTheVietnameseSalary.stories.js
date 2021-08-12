import PcTheVietnameseSalary from '@/components/organisms/Salaries/TheVietnameseSalary/PcTheVietnameseSalary'

export default {
  title: 'pc/organisms/PcTheVietnameseSalary',
  component: PcTheVietnameseSalary
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PcTheVietnameseSalary },
  template: `<pc-the-vietnamese-salary v-bind="$props"></pc-the-vietnamese-salary>`
})

export const Default = Template.bind({})
