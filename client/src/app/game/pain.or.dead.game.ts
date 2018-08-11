import * as box2d from "./Box2D/Box2D";
import {GroundCreator} from "./ground/ground.creator";
import {ShapeDrawer} from "./shape.drawer";
import {Car} from "./car";
import {NiceGuyFactory} from "./niceguy/nice.guy.factory";
import {BunchOfNiceGuys} from "./niceguy/bunch.of.nice.guys";
import {NiceGuySize} from "./niceguy/nice.guy.size";
import {AbstractCar} from "./cars/abstract.car";
import {HulkCar} from "./cars/hulk.car";
import {CarSettings} from "./cars/car.settings";
import {SpidermanCar} from "./cars/spiderman.car";

export class PainOrDeadGame extends box2d.b2ContactListener {
  private readonly world: box2d.b2World;
  private groundCreator: GroundCreator;
  private car: AbstractCar;
  private bunchOfNiceGuys: BunchOfNiceGuys;

  constructor(shapeDrawer: ShapeDrawer) {
    super();
    const carSettings = {hz: 40, zeta: 0.5, speed: 300, maxMotorTorque: 1500};
    this.world = this.createWorld(shapeDrawer);
    this.groundCreator = new GroundCreator(this.world);
    this.car = new SpidermanCar(this.world, carSettings);
    const niceGuyFactory = new NiceGuyFactory(this.world);
    this.bunchOfNiceGuys = new BunchOfNiceGuys(niceGuyFactory);

    this.world.SetContactListener(this);
  }

  public create(): void {
    this.groundCreator.create();
    this.car.create();
    this.createBunchOfNiceGuys();

  }

  public PostSolve(contact: box2d.b2Contact, impulse: box2d.b2ContactImpulse) {
    this.bunchOfNiceGuys.postSolve(contact, impulse);
  }

  getCarX(): number {
    return this.car.getX();
  }

  step(timeStep: number, velocityIterations: number, positionIterations: number, particleIterations: number) {
    this.world.Step(timeStep, velocityIterations, positionIterations, particleIterations);
  }

  updateBodiesState() {
    this.bunchOfNiceGuys.updateBodiesState();
  }

  draw() {
    this.world.DrawDebugData();
  }

  moveCarForward() {
    this.car.moveForward();
  }

  moveCarBackward() {
    this.car.moveBackward();
  }

  stopEngine() {
    this.car.stop();
  }

  private createWorld(shapeDrawer: ShapeDrawer): box2d.b2World {
    const particleSystemDef = new box2d.b2ParticleSystemDef();
    const gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, -10);
    const world: box2d.b2World = new box2d.b2World(gravity);
    const particleSystem = world.CreateParticleSystem(particleSystemDef);

    world.SetDebugDraw(shapeDrawer);

    particleSystem.SetGravityScale(0.4);
    particleSystem.SetDensity(1.2);

    return world;
  }

  private createBunchOfNiceGuys() {
    this.bunchOfNiceGuys.create(NiceGuySize.NORMAL_GUY, 15, 0);
    this.bunchOfNiceGuys.create(NiceGuySize.SMALL_GUY, 43, 0);
    this.bunchOfNiceGuys.create(NiceGuySize.NORMAL_GUY, 72, 0.8);
    this.bunchOfNiceGuys.create(NiceGuySize.BIG_GUY, 105, 0);
    this.bunchOfNiceGuys.create(NiceGuySize.NORMAL_GUY, 155, 0);
    this.bunchOfNiceGuys.create(NiceGuySize.NORMAL_GUY, 215, 0);
    this.bunchOfNiceGuys.create(NiceGuySize.BIG_GUY, 270, 0);
    this.bunchOfNiceGuys.create(NiceGuySize.SMALL_GUY, 342, 11);
    this.bunchOfNiceGuys.create(NiceGuySize.NORMAL_GUY, 382, 10.0);
    this.bunchOfNiceGuys.create(NiceGuySize.NORMAL_GUY, 450, 5.0);
    this.bunchOfNiceGuys.create(NiceGuySize.NORMAL_GUY, 490, 20.0);
    this.bunchOfNiceGuys.create(NiceGuySize.BIG_GUY, 510, 10.0);
    this.bunchOfNiceGuys.create(NiceGuySize.SMALL_GUY, 570, 0);
  }
}
