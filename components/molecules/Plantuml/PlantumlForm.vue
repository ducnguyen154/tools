<template>
  <div>
    <b-form-group
      id="plantuml-content"
      label="Enter UML content"
      label-for="plantuml-content"
    >
      <b-form-textarea
        id="plantuml-content"
        v-model="umlContent"
      ></b-form-textarea>
    </b-form-group>
    <b-button @click="onSubmit">Submit</b-button>
  </div>
</template>

<script>
// import plantuml from 'node-plantuml'
export default {
  data() {
    return {
      umlContent: '',
    }
  },
  methods: {
    onSubmit() {
      // const gen = plantuml.generate('A -> B: Hello', { format: 'svg' })
      // eslint-disable-next-line no-console
      // console.log(gen)
    },
  },
}
</script>
