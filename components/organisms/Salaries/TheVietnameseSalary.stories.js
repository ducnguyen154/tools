import TheVietnameseSalary from '@/components/organisms/Salaries/TheVietnameseSalary'

export default {
  title: 'organisms/Salaries/TheVietnameseSalary',
  component: TheVietnameseSalary
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TheVietnameseSalary },
  template: `<the-vietnamese-salary v-bind="$props"></the-vietnamese-salary>`
})

export const Default = Template.bind({})
