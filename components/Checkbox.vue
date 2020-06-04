<template>
    <label :class="{done: value.done}" class="checkbox-label">
      <input
        :class="{dnone: notVisible}"
        type="checkbox"
        :value="value"
        :checked="shouldBeChecked"
        @change="updateInput"
      >
      <template v-if="!onFocus">
        <span>{{ label }}</span>
      </template>
      <template v-else>
        <input type="text"
               v-on:keyup.enter="saveNewLabel"
               v-on:blur="saveNewLabel"
               class="edit-label-input" ref="labelinput"
               v-model="editedlabel"
        >
      </template>
      <button v-if="!notVisible" class="edit-label-btn" @click.prevent="editLabel">
        <svg v-if="!onFocus" height="16px" viewBox="-15 -15 484.00019 484" width="16px" xmlns="http://www.w3.org/2000/svg"><path d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0"/></svg>
        <img v-else src="../static/done-icon.png" alt="">
      </button>
    </label>
</template>

<script>
  export default {
      data() {
        return {
          editedlabel: this.label,
          onFocus: false
        }
      },
      model: {
        prop: 'modelValue',
        event: 'change'
      },
      props: {
        value: {
          type: Object,
        },
        modelValue: {
          default: false
        },
        label: {
          type: String,
          required: true
        },
        trueValue: {
          default: true
        },
        falseValue: {
          default: false
        },
        notVisible: {
          type: Boolean,
          default: false
        }
      },
      methods: {
        saveNewLabel(e) {
          this.onFocus = false;
          const newValue = e.target.value;
          this.$emit('updateLabel', {currentTodo: this.value, newValue});
        },
        editLabel() {
          this.onFocus = true;

          this.$nextTick(() => {
            this.$refs.labelinput.focus();
          });
        },
        updateInput(event) {
          let isChecked = event.target.checked;

          if (this.modelValue instanceof Array) {
            let newValue = [...this.modelValue];

            if (isChecked) {
              newValue.push(this.value);
            } else {
              newValue.splice(newValue.indexOf(this.value), 1);
            }

            this.$emit('change', newValue);
          } else {
            this.$emit('change', isChecked ? this.trueValue : this.falseValue);
          }
        }
      },
      computed: {
        shouldBeChecked() {
          if (this.modelValue instanceof Array) {
            return this.modelValue.includes(this.value);
          }
          return this.modelValue === this.trueValue;
        }
      },
  }
</script>

<style scoped lang="scss">
  .edit-label-input {
    border: none!important;
    border-bottom: 1px solid red;
    margin-left: 5px;
    font-size: 14px;
    background-color: #ffffff;
    &:focus {
      border: none;
      border-bottom: 1px solid red;
    }
  }
  .edit-label-btn {
    border: none;
    background-color: #ffffff;
    outline: none;
    margin-left: 5px;
    cursor: pointer;
    img {
      width: 20px;
    }
  }
  .checkbox-label {
    display: flex;
    span {
      margin-left: 5px;
    }
  }
  .todo-item-wrap {
    display: flex;
  }
  .dnone {
    display: none!important;
  }
  .done {
    text-decoration: line-through;
  }
  .edit-icon {
    margin-left: 5px;
  }
  label {
    font-size: 18px;
  }
  @supports(-webkit-appearance: none) or (-moz-appearance: none) {
    input[type='checkbox'],
    input[type='radio'] {
      --active: #2196f3;
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, .3);
      --border: #BBC1E1;
      --border-hover: #275EFE;
      --background: #fff;
      --disabled: #F6F8FF;
      --disabled-inner: #E1E6F9;
      -webkit-appearance: none;
      -moz-appearance: none;
      height: 21px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background .3s, border-color .3s, box-shadow .2s;
      &:after {
        content: '';
        display: block;
        left: 0;
        top: 0;
        position: absolute;
        transition: transform var(--d-t, .3s) var(--d-t-e, ease), opacity var(--d-o, .2s);
      }
      &:checked {
        --b: var(--active);
        --bc: var(--active);
        --d-o: .3s;
        --d-t: .6s;
        --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
      }
      &:disabled {
        --b: var(--disabled);
        cursor: not-allowed;
        opacity: .9;
        &:checked {
          --b: var(--disabled-inner);
          --bc: var(--border);
        }
        & + label {
          cursor: not-allowed;
        }
      }
      &:hover {
        &:not(:checked) {
          &:not(:disabled) {
            --bc: var(--border-hover);
          }
        }
      }
      &:focus {
        box-shadow: 0 0 0 var(--focus);
      }
      &:not(.switch) {
        width: 21px;
        &:after {
          opacity: var(--o, 0);
        }
        &:checked {
          --o: 1;
        }
      }
      & + label {
        font-size: 14px;
        line-height: 21px;
        display: inline-block;
        vertical-align: top;
        cursor: pointer;
        margin-left: 4px;
      }
    }
    input[type='checkbox'] {
      &:not(.switch) {
        border-radius: 7px;
        &:after {
          width: 5px;
          height: 9px;
          border: 2px solid var(--active-inner);
          border-top: 0;
          border-left: 0;
          left: 7px;
          top: 4px;
          transform: rotate(var(--r, 20deg));
        }
        &:checked {
          --r: 43deg;
        }
      }
      &.switch {
        width: 38px;
        border-radius: 11px;
        &:after {
          left: 2px;
          top: 2px;
          border-radius: 50%;
          width: 15px;
          height: 15px;
          background: var(--ab, var(--border));
          transform: translateX(var(--x, 0));
        }
        &:checked {
          --ab: var(--active-inner);
          --x: 17px;
        }
        &:disabled {
          &:not(:checked) {
            &:after {
              opacity: .6;
            }
          }
        }
      }
    }
    input[type='radio'] {
      border-radius: 50%;
      &:after {
        width: 19px;
        height: 19px;
        border-radius: 50%;
        background: var(--active-inner);
        opacity: 0;
        transform: scale(var(--s, .7));
      }
      &:checked {
        --s: .5;
      }
    }
  }
</style>
