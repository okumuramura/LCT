<template>
<span
    style="color:white;"
    >
    <input
        type="checkbox"
        :readonly="readonly"
        v-model="checked"
        v-on:input="onChange($event)"
        @dblclick.stop=""
        @pointerdown.stop=""
        @pointermove.stop=""
        @mousedown.stop
    />
    {{ label }}
</span>
</template>

<script>
export default {
    props: ['initial', 'readonly', 'label', 'emitter', 'ikey', 'putData', 'getData'],
    data() {
        return {
            checked: this.initial || false,
        }
    },
    methods: {
        onChange(value) {
            this.checked = value.target.checked;
            this.update();
        },
        update() {
            if (this.ikey) {
                this.putData(this.ikey, this.checked);
            }
            this.emitter.trigger('process');
        }

    },
    mounted() {
        if (this.getData(this.ikey) === undefined) {
            this.checked = this.initial;
            this.putData(this.ikey, this.checked);
        }
        else {
            this.checked = this.getData(this.ikey);
        }
    }
}
</script>