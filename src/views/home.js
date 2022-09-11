import ImagePreview from '../components/ImageSelector'
import Button from 'primevue/button'
import Ripple from 'primevue/ripple'
import Textarea from 'primevue/textarea'
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
export default {
  name: 'Home-View',
  data() {
    return {
      images: [],
      valueText: '',
      form: {
        data: null
      }
    }
  },
  methods: {
    myUploader (e) {
      var files = e.target.files;
      
      Array.from(files).forEach(element => {
        var reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = e => {
          this.images.push(e.target.result)
        };
      });
    },
    onClearImages () {
      this.images = [];
    }
  },
  components: {
    ImagePreview,
    Button,
    Textarea,
    Calendar,
    InputText
  },
  directives: {
    'ripple': Ripple
  }
}
