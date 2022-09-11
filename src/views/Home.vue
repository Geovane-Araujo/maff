<template>
  <div class="home">
    <ImagePreview :images="images" :text="valueText"/>
    <div>
      <Textarea class="p-inputtextarea" v-model="valueText" rows="6" cols="25"></Textarea>
      <div class="groupp">
        <div class="p-ripple container-input-file" ripple>
          <label for="file-selector"><div class="btn-file">Selecione as fotos</div></label>
          <input id="file-selector" @change="myUploader" type="file" name="selec" accept="image/*" multiple/>
        </div>
        <Button label="Limpar" @click="onClearImages" class="p-button-help" />
      </div>
    </div>
  </div>
</template>

<script src="./home.js">
</script>
<style lang="scss">
.p-inputtextarea{
  text-align: end;
  align-items: flex-end;
}
.home{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.groupp{
  display: flex;
  height: 40px;
  margin-top:20px;
}
.container-input-file{
  margin-right: 10px;
  input[type='file']{
    display: none;
  }
  .btn-file{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    text-align: center;
    color: white;
    width: 150px;
    height: 40px;
    background-color: #8C239E;
  }
}
</style>
