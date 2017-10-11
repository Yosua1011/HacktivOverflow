<template>
  <div class="col-md-9 text-left">
    <form class="form-group" @submit="publishMe(newdata)">
       <label class="control-label" for="focusedInput">Title</label>
       <input class="form-control" id="focusedInput" type="text" value={{detail.title}} v-model="newdata.title" required><br>
       <label class="control-label" for="focusedInput">Content</label>
       <vue-tinymce v-model="newdata.content" value={{detail.content}}></vue-tinymce><br>
       <button type="submit" class="btn btn-primary">Publish</button>
    </form>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
