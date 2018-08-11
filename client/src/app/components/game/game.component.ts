import {Component, ElementRef, HostListener, OnInit, ViewChild} from "@angular/core";
import {Car} from "../../game/car";
import {Camera} from "../../game/camera";
import {ShapeDrawer} from "../../game/shape.drawer";
import {GameSettings} from "../../game/game.settings";
import {INiceGuyFactory} from "../../game/niceguy/inice.guy.factory";
import {NiceGuyFactory} from "../../game/niceguy/nice.guy.factory";
import {PainOrDeadGame} from "../../game/pain.or.dead.game";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @ViewChild('gameCanvas') canvasRef: ElementRef;
  private settings: GameSettings;
  private painOrDeadGame: PainOrDeadGame;
  private leftArrowPressed: boolean = false;
  private rightArrowPressed: boolean = false;
  private upArrowPressed: boolean = false;
  private downArrowPressed: boolean = false;

  constructor(
    private camera: Camera,
    private shapeDrawer: ShapeDrawer
  ) {
    this.settings = new GameSettings();
  }


  ngOnInit() {
    let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    this.shapeDrawer.ctx = ctx;
    this.painOrDeadGame = new PainOrDeadGame(this.shapeDrawer);
    this.painOrDeadGame.create();

    window.requestAnimationFrame(time => this.simulateGame(time, ctx));
  }

  public simulationLoop(time: number, ctx: CanvasRenderingContext2D): void {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();

    ctx.translate(0.5 * ctx.canvas.width, 0.5 * ctx.canvas.height);
    ctx.scale(1, -1);
    const s: number = 0.5 * this.camera.m_height / this.camera.m_extent;
    ctx.scale(s, s);
    ctx.lineWidth /= s;

    ctx.scale(1 / this.camera.m_zoom, 1 / this.camera.m_zoom);
    ctx.lineWidth *= this.camera.m_zoom;
    ctx.translate(-this.camera.m_center.x, -this.camera.m_center.y);

    this.step(this.settings);
    ctx.restore();
  }

  public step(settings: GameSettings): void {
    let timeStep = settings.hz > 0 ? 1 / settings.hz : 0;

    this.shapeDrawer.setDrawerFlags(this.settings);

    this.setCarAcceleration();

    this.camera.m_center.x = this.painOrDeadGame.getCarX();

    // this.car.breakable.Step();
    this.painOrDeadGame.step(timeStep, settings.velocityIterations, settings.positionIterations, settings.particleIterations);
    this.painOrDeadGame.updateBodiesState();
    this.painOrDeadGame.draw();

  }

  @HostListener('document:keydown', ['$event'])
  public onKeyDown(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft") {

      this.leftArrowPressed = true;
    }
    if (event.key == "ArrowRight") {
      this.rightArrowPressed = true;
    }
    if (event.key == "ArrowUp") {
      this.upArrowPressed = true;
    }
    if (event.key == "ArrowDown") {
      this.downArrowPressed = true;
    }
    event.stopPropagation();
  }

  @HostListener('document:keyup', ['$event'])
  public onKeyUp(event: KeyboardEvent): void {
    if (event.key === "ArrowLeft") {
      this.leftArrowPressed = false;
    }
    if (event.key == "ArrowRight") {
      this.rightArrowPressed = false;
    }
    if (event.key == "ArrowUp") {
      this.upArrowPressed = false;
    }
    if (event.key == "ArrowDown") {
      this.downArrowPressed = false;
    }
    event.stopPropagation();
  }

  private simulateGame(time: number, ctx: CanvasRenderingContext2D): void {
    this.simulationLoop(time, ctx);
    window.requestAnimationFrame(time => this.simulateGame(time, ctx));
  }

  private setCarAcceleration() {
    if (this.leftArrowPressed && this.rightArrowPressed) {
      this.painOrDeadGame.moveCarForward();
    } else if (this.leftArrowPressed) {
      this.painOrDeadGame.moveCarForward();
    } else if (this.rightArrowPressed) {
      this.painOrDeadGame.moveCarBackward();
    } else {
      this.painOrDeadGame.stopEngine();
    }

  }

  onClickDiv() {
    console.log(this.painOrDeadGame.getCarX());
  }
}
