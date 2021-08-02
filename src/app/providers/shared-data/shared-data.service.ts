import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class SharedDataService {


  qans;
  mcqs;
  constructor() {
   this.fetch_qans();
   this.fetch_mcqs();
  }
  
  async fetch_qans(){
    this.qans=[{question:'question1',answer:'answer answeranswer answer answeranswer answer answer answer answer answer'},
      {question:'question2',answer:'answer answeranswer answer answeranswer answer answer answer answer answer'},
      {question:'question3',answer:'answer answeranswer answer answeranswer answer answer answer answer answer'},
      ];
    // this.authService.getData('fetch_language').then(async (result) =>  {
    //   if(result['status']=='success')
    //   {
    //       this.language=result['language'];
    //       this.faq_lang_id=1;
    //       this.byelaws_lang_id=1;
    //       this.news_lang_id=1;
    //   }
    // },async (err) => {
    //   console.log(err);
    // });
  }
  async fetch_mcqs(){
    this.mcqs=[{question:'question1',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    {question:'question2',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    {question:'question3',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    {question:'question4',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    ];
  console.log(this.qans);
  }
  
//   isRootUrl() {
//     if (this.router.url == '/tab/dashboard') return true
//     else if (this.router.url == '/tab/home') return true
//     else if (this.router.url == '/tab/faq') return true
//     else if (this.router.url == '/tab/subscription') return true
//     else if (this.router.url == '/tab/news') return true
//     else
//       return false;
// }

}
