<template>
<input
  :type="type"
  :readonly="readonly"
  :value="value"
  @input="onChange($event)"
  @dblclick.stop=""
  @pointerdown.stop=""
  @pointermove.stop=""
  @mousedown.stop
  />
</template>

<script>
export default {
  props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'getData', 'putData'],
  data() {
    return {
      value: this.initial || 0,
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
