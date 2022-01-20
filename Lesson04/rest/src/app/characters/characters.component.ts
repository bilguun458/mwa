import { Component, OnInit } from '@angular/core';

import { CharactersApiService } from '../characters-api.service';


export class Character {
  #name!: string;
  #gender!: string;
  #titles!: string[];
  get name() { return this.#name }
  get gender() { return this.#gender }
  get titles() { return this.#titles }
  constructor(name: string, gender: string, titles: string[]) {
    this.#gender = gender;
    this.#name = name;
    this.#titles = titles;
  }
}

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];

  constructor(private charactersService: CharactersApiService) { }

  ngOnInit(): void {
    this.charactersService.getCharacters().then((characters) => {
      console.log("characters: ", characters);
      this.characters = characters;
    });
  }

}
