
<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
div {
  max-width: 200px;
  background-color: yellow;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;

  & h1 {
    font-size: 1.8rem;
  }

  & p {
    margin: 0;
    padding: 0;
  }
}
</style>
