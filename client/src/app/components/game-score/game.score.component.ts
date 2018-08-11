import {Component, OnDestroy, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {GameScoreService} from "../../services/game.score.service";

@Component({
  selector: 'app-game-score',
  templateUrl: './game.score.component.html',
  styleUrls: []
})
export class GameScoreComponent implements OnInit, OnDestroy {
  public gameScores: any[];
  constructor(
    private authService: AuthService,
    private gameScoreService: GameScoreService
  ) {
  }


  ngOnInit() {
    this.gameScoreService.getAll().subscribe(result => {
      this.gameScores = result.gameScores;
    });
  }

  ngOnDestroy(): void {
  }


}
