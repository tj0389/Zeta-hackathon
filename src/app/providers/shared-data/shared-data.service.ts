import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})

export class SharedDataService {

  cardNumber = "1020 3949 4893 3983";
  cvv = 100;
  balance = 1000;

  mcq_score:number=0;
  mcq_score_count;

  qans=null;
  mcqs=null;
  is_checked=[];

  constructor() {
  }
  
  async fetch_qans(){
    this.qans=[{question:'Ques1',answer:' choose the best answer from the choices provided, and fill in the corresponding circle on your answer sheet. For questions 16-20, solve the problem and enter your answer in the grid on the answer sheet. Please refer to the directions before question 16 on how to enter your answers in the grid. You may use any available space in your test booklet for scratch work.'},
      {question:'Ques2',answer:' choose the best answer from the choices provided, and fill in the corresponding circle on your answer sheet. For questions 16-20, solve the problem and enter your answer in the grid on the answer sheet. Please refer to the directions before question 16 on how to enter your answers in the grid. You may use any available space in your test booklet for scratch work.'},
      {question:'Ques3',answer:'choose the best answer from the choices provided, and fill in the corresponding circle on your answer sheet. For questions 16-20, solve the problem and enter your answer in the grid on the answer sheet. Please refer to the directions before question 16 on how to enter your answers in the grid. You may use any available space in your test booklet for scratch work.'},
      ];
  }

  async fetch_mcqs(){
    this.mcqs=[{question:'question1',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    {question:'question2',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    {question:'question3',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    {question:'question4',option:['Haa','Bol','Saale','Mere'],answer:'Bol'},
    ];
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
