<template>
  <form
  @dblclick.stop=""
  @pointerdown.stop=""
  @pointermove.stop=""
  @mousedown.stop>
    {{ label }}
    <select @change="onChange($event)" v-model="value">
      <option v-for="option in options" :value="option">{{ option }}</option>
    </select>
  </form>
</template>

<script>
export default {
  props: ['initial', 'readonly', 'label', 'options', 'emitter', 'ikey', 'type', 'getData', 'putData'],
  data() {
    return {
      value: this.initial || ''
    }
  },
  methods: {
    onChange(e){
      console.log(e.target.value);
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey) {
        this.putData(this.ikey, this.value);
      }
      this.emitter.trigger('process');
    }
  },
  mounted() {
    if (this.getData(this.ikey) === undefined){
      this.value = this.initial;
      this.putData(this.ikey, this.initial);
    }
    else {
      this.value = this.getData(this.ikey);
    }
  }
}
</script>
