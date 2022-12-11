import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useFeedStore = defineStore('feedStore', () => {
  // State/Data
  /* Info about the RSS sources */
  const sources = ref([
    {
      id: crypto.randomUUID(),
      name: 'Mozilla Hacks',
      url: 'https://hacks.mozilla.org/feed'
    }
  ]);
  /* Current feed */
  const current = ref({
    source:null,
    items: null
  }
)
  // Getters/Computed
  /* Not needed */
  // Actions/Methods
  const loadSource = async (source) => {
    const response = await fetch(source.url);
    let text = await response.text();
    text = text.replace(/content:encoded/g, 'content');
    /* In order to transform XML to DOM */
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(text, 'text/xml');
    console.log(doc);
    /* Lets get out items/posts */
    let posts = [];
    let content, link;
    doc.querySelectorAll('item, entry').forEach(item => {

      if(item.querySelector('content')){
        content = item.querySelector('content').textContent
        link = item.querySelector('link')?.textContent
      }else if(item.querySelector('description')){
        content = item.querySelector('description').textContent
        link = item.querySelector('link')?.textContent
      }
      else if(item.querySelector('link')){
        content = item.querySelector('link').textContent
      }else{
        content = 'There seems to be no content'
      }

      let post = {
        title: item.querySelector('title').textContent ? item.querySelector('title').textContent : 'Nameless',
        content: content,
        link: link ? link : ''
      }
      posts.push(post);
    })
    current.value.items = [...posts];
    current.value.source = source;
  }

  
  const registerNewSource = async (url) => {
    try {
      const response = await fetch(url);
      let text = await response.text();
      const domParser = new DOMParser();
      const doc = domParser.parseFromString(text, 'text/xml');
      console.log(doc);
      /* In order not to add a repeated value to our state */
      let guard 
      sources.value.forEach(element => {
        if(Object.values(element).includes(doc.querySelector('title').textContent)) {
          guard = true;
        } 
      });
      if(guard) return;
      /* In order not to add a repeated value to our state (end) */

      const source = {
        id:crypto.randomUUID(),
        name: doc.querySelector('title').textContent,
        url
      }
      sources.value.push(source)

    } catch (error) {
      console.log(error);
    }
  }


  return { sources, current, loadSource, registerNewSource}
})
