export class RoutesHttp{
  onRoute(){
    if(window.location.hostname === 'localhost'){
      return "http://localhost"
    }
  }
}