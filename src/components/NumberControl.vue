<template>
<input
  :type="type"
  :readonly="readonly"
  :value="value"
  @input="onChange($event)"
  @dblclick.stop=""
  @mousedown.stop
  />
</template>

<script>
export default {
  props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
  data() {
    return {
      value: 0, // this.initial || 0,
    }
  },
  methods: {
    parse(value) {
      return this.type === 'number' ? +value : value;
    },
    onChange(e){
      this.value = this.parse(e.target.value);
      this.update();
    },
    update() {
      if (this.ikey) {
        this.putData(this.ikey, this.value)
        this.change(this.value);
      }
      this.emitter.trigger('process');
    }
  },
  mounted() {
    let value = this.getData(this.ikey)
    this.value = value;
  }
}
</script>
