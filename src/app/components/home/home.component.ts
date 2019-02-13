import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HomeService } from '../../service/home.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  list: any = [];
  showResults: boolean = false;
  repoList: any = [];

  constructor(
    private homeService: HomeService,
    private commonService: CommonService) { }

  ngOnInit() {
  }

  searchForm = new FormGroup({
    userName: new FormControl(''),
    repo: new FormControl(''),
  });

  // Function for get the list of all repo for the user.
  getRepoList() {
    this.showResults = false;
    this.homeService.getUserRepos(this.searchForm.value)
      .subscribe(heroes => {
        this.list=[];
        this.list = heroes;
        this.showResults = true;
        this.getRepo();
      });

  }

  // Function for get the details of particular repo of the user.
  getRepoDetails() {
    this.showResults = false;
    if(this.searchForm.value.userName && this.searchForm.value.repo)
    {
      this.homeService.getUserReposDetails(this.searchForm.value)
      .subscribe(heroes => {
        this.list = [];
        this.list.push(heroes);
        this.showResults = true;
        this.repoList = [];
      });
    }
    else
    {
      alert(`Fill ${this.searchForm.value.userName?'Repo name':'UserName'}`)
    }

  }

  //fetches data from local storage for the user
  getRepo() {
    this.repoList = this.commonService.getItem(this.searchForm.value.userName)||[];
  }

  // function to add and rmove repo from Picked list
  pickRepo(repo: any, remove: any = false) {
    if(!remove) {
      this.repoList.push(repo);
    }
    else {
      this.removeRepoFromPickedList(repo.id);
    }
    this.commonService.setItem(this.searchForm.value.userName, this.repoList);
  }

  // function to check whether the user has already picked the particular repo
  isRepoPicked(id: any) {
   return this.repoList.find((item:any)=>item.id===id);
  }

  //function to remove repo from picked list
  removeRepoFromPickedList(id:any){
    this.repoList = this.repoList.filter((item:any)=> item.id!==id);
  }

}
