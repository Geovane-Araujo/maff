<template>
<div class="loading" v-show="isLoading">
  <div class="lo-gi">
  </div>
  Processando imagem... aguarde!
</div>
  <div class="image-selector">
    <div v-for="image in images" :key="image">
      <div class="mini-images" @click="onOpenPreview(image)">
        <img :src="image" alt="" srcset="">
      </div>
    </div>
  </div>
  <div v-show="previewOpen" class="image-preview">
    <div class="close">
      <Button @click="onClosePreview" icon="pi pi-times"></Button>
      <Button style="margin-left: 10px;" @click="onDownloadImage" icon="pi pi-download"></Button>
    </div>
    <div class="content">
      <div id="content-image">
        <div id="text" class="text">
          <p>
            {{ viewText[0] }} <br/>
            {{ viewText[1] }} <br/>
            {{ viewText[2] }} <br/>
            {{ viewText[3] }} <br/>
            {{ viewText[4] }} <br/>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button'
import domtoimage from "dom-to-image-more"
import axios from 'axios'
export default {
  name: 'ImagePreview',
  data () {
    return {
      previewOpen: false,
      viewImage: '',
      viewText: [],
      isLoading: false
    }
  },
  methods: {
    onOpenPreview (e) {
      
      this.viewText = this.text.split(/\n/g)
      this.viewImage = e;
      document.getElementById('content-image').style.backgroundImage = 'url('+ e +')'

      var imglenght = new Image();
      imglenght.src = e;

      imglenght.onload = function() {
        
        resizeDiv(imglenght.height,imglenght.width)
      }

      function resizeDiv(height, width){
        var divimg = document.getElementById("content-image");
        var divtext = document.getElementsByClassName("text")[0];
        divimg.style.width = width + 'px';
        divimg.style.height = height + 'px';
        divtext.style.left = (width - 355) + 'px';
        divtext.style.top = (height - 145) + 'px';

      }
      this.previewOpen = true
    },
    onClosePreview () {
      this.previewOpen = (this.previewOpen ? false : true)
    },
    onDownloadImage () {
      this.isLoading = true
      console.log(this.viewText)
      var node = document.getElementById('text')
      domtoimage.toBlob(node).then(blob => {
        var reader = new FileReader();
        reader.readAsDataURL(blob)
        reader.onloadend = e => {
          var base = reader.result;
          var images = {
            imgString: this.viewImage,
            imgText: base
          }
          
          axios.post("https://adonaisoft.com:8090/utils/textImage", images).then(res => {
            var image = new Image();
            image.src = res.data;
            var w = window.open("")
            w.document.write(image.outerHTML)
            this.isLoading = false
          }).catch(err => {
            alert(err.message)
            this.isLoading = false
          })
        }
        
      });
    }
  },
  props: {
    images: Array,
    text: String
  },
  components: {
    Button
  }
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.loading{
  position: absolute;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 25px;
  background-color: rgba($color: #f5f4f4, $alpha: 0.7);
  .lo-gi{
    height: 300px;
    width: 500px;
    background-image: url('../assets/logif.gif');
    background-repeat: no-repeat;
  }
}
.image-preview {
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: absolute;
  z-index: 999;
  .close{
    height: 5%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 16px;
  }
}
.content{
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.mini-images {
  margin: 10px;
  width: 150px;
  height: 150px;
  background-color: burlywood;
}
.image-selector{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
#content-image{
  background-color: black;
  background-size: auto;
  background-repeat: no-repeat;
}
.text{
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  text-align: end;
  position: relative;
  width: 350px;
  height: 140px;
  color: rgb(248, 252, 251);
}
</style>
