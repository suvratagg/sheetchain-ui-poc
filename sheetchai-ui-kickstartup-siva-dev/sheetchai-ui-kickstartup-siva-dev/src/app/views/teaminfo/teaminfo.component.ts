import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-teaminfo',
  templateUrl: './teaminfo.component.html',
  styleUrls: ['./teaminfo.component.css']
})
export class TeaminfoComponent implements OnInit {

  teamname: string = "";
  teaminfo:any = [{
    image:"assets/suvrat.png",
    title:"SUVRAT AGGARWAL (Founder)",
    description:"Currently pursuing PGDM in Business Analytics from NMIMS, Mumbai and an Engineering graduate, Suvrat is a firm believer that businesses need to redefine themselves in the current world of disruptions.His previous work experience at Puresoftware Pvt Ltd and NIIT Technologies as a web developer has helped him understand latest technology and importance of technology in business.He has interned with firms like HCL Infosystems, KPMG and Accenture in consulting domain where he learnt customer interaction early in his career. Suvrat believes that there are said and un-said customer problems which exist, one must be able to identify the hidden or un-said problems in said or visible customer problems to excel as a business and cater a large customer base."
  },{
    image:"assets/astha.jpeg",
    title:"ASTHA MALIK (Co-Founder)",
    description:"Currently pursuing PGDM in Business Analytics from NMIMS, Mumbai and a CFA Level III Candidate, Astha has a keen interest in understanding Business Models and Valuation strategies. Her previous work experience in D.P Ultra Engineers Private Limited as an analyst helped her understand the Business strategy and Financial understanding of handling Business decisions. She also interned with Grant Thornton briefly under the Valuations team, where she worked on various business transactions using Discounted Cash Flow Analysis, Comparable Company Analysis, and Comparable Transaction Analysis. She also worked on the audit reviews of various Valuation assignments."
  },
  {
    image:"assets/Akash.jpg",
    title:"AKASH MALIK (Co-Founder)",
    description:"Currently working as Blockchain Application Developer in an MNC. Akash has around 7.5 years of software development experience. Since 2 years, Akash has been part of Blockchain Application development using Hyperledger Fabric, Angular , NodeJs and Java. Akash has experience of working on different programming languages and frameworks like Angular 2 and above, ReactJs,  Java 7, Java 8, Python, J2EE Technologies: JSP, Servlets, Enterprise JavaBeans, Java Messaging Service, Java Naming and Directory Interface, Java Database Connectivity ,Java Framework: Struts, Spring, Hibernate, Apache DeltaSpike, JPA, Lombok.Akash has been driven by his intellectual curiosity to find answers to the most of the problems and his specialty includes quickly learning new skills/programming language and problem solving."
  },{
    image:"assets/Manav.jpg",
    title:"MANAV CHIRANIA (Software Developer)",
    description:"Manav is currently pursuing his Btech in Mathematics and Computing from IIT Guwahati and has a great deal of interest in Blockchain and how it can be explored in various sectors.He has worked on a Blockchain based Voting system during Microsoft's Codefundo and was part of the runners up team from his college. Apart from this, he has also researched on ideas aiming to use blockchain technology in the supply chain industry."
  }];
  constructor(private route: ActivatedRoute) {
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => this.teamname = params['teamname']);
  };

}
