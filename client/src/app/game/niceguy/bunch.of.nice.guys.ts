import * as box2d from "../Box2D/Box2D";
import {INiceGuyFactory} from "./inice.guy.factory";
import {NiceGuySize} from "./nice.guy.size";
import {NiceGuy} from "./nice.guy";

export class BunchOfNiceGuys {
  private niceGuys: NiceGuy[] = [];
  constructor(
    private niceGuyFactory: INiceGuyFactory
  ) {}

  create(size: NiceGuySize, x: number, y: number) {
    const niceGuy = this.niceGuyFactory.create(size, new box2d.b2Vec2(x, y));
    this.niceGuys.push(niceGuy);
  }

  postSolve(contact: box2d.b2Contact, impulse: box2d.b2ContactImpulse) {
    this.niceGuys.forEach(niceGuy => {
      const maxImpulse = niceGuy.destroyJointWhenBodyHitOverMaxImpulse(contact, impulse);
    });
  }

  updateBodiesState() {
    this.niceGuys.forEach(niceGuy => niceGuy.updateBodiesState());
  }
}
