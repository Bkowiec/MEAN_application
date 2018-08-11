import * as box2d from "./../Box2D/Box2D";
import {forEach} from "@angular/router/src/utils/collection";

export class NiceGuy  {
  public leftLeg: box2d.b2Body;
  public rightLeg: box2d.b2Body;
  public leftArm: box2d.b2Body;
  public rightArm: box2d.b2Body;
  public torso: box2d.b2Body;
  public head: box2d.b2Body;
  public headJoint: box2d.b2Joint;
  public leftArmJoint: box2d.b2Joint;
  public rightArmJoint: box2d.b2Joint;
  public leftLegJoint: box2d.b2Joint;
  public rightLegJoint: box2d.b2Joint;
  public id: number;
  private world: box2d.b2World;
  private breakableBodies: { body: box2d.b2Body, joint: box2d.b2Joint, maxImpulse: number, broken: boolean }[] = [];

  constructor(world: box2d.b2World) {
    this.world = world;
  }

  public destroyJointWhenBodyHitOverMaxImpulse(contact: box2d.b2Contact, impulse: box2d.b2ContactImpulse): number {
    const contactA: box2d.b2Body = contact.GetFixtureA().GetBody();
    const contactB: box2d.b2Body = contact.GetFixtureB().GetBody();

    for (let i: number = 0; i < this.breakableBodies.length; ++i) {
      const breakableBody = this.breakableBodies[i];
      if (this.isBodyInContact(breakableBody.body, contactA, contactB)) {
        const count = contact.GetManifold().pointCount;

        let maxImpulse = 0.0;
        for (let i = 0; i < count; ++i) {
          maxImpulse = box2d.b2Max(maxImpulse, impulse.normalImpulses[i]);
        }
        if (breakableBody.maxImpulse < maxImpulse) {
          breakableBody.broken = true;
          return maxImpulse;
        }
      }
    }
  }

  setBodyBreakable(body: box2d.b2Body, joint: box2d.b2Joint, maxImpulse: number) {
    this.breakableBodies.push({body: body, joint: joint, maxImpulse: maxImpulse, broken: false});
  }

  updateBodiesState(): void {
    const brokenBodies = this.breakableBodies.filter(breakableBody => breakableBody.broken);

    if (brokenBodies == undefined || brokenBodies.length === 0) {
      return;
    }
    // console.log(brokenBodies);
    brokenBodies.forEach(breakableBody => {
      this.world.DestroyJoint(breakableBody.joint);
      breakableBody.broken = true;
    });

    this.breakableBodies = this.breakableBodies.filter(breakableBody => !breakableBody.broken);
  }

  private isBodyInContact(body: box2d.b2Body, contactA: box2d.b2Body, contactB: box2d.b2Body): boolean {
    if (contactA.GetUserData() !== null) {
      if ((contactA.GetUserData().id === body.GetUserData().id) && (contactA.GetUserData().type === body.GetUserData().type)) {
        return true;
      }
    }
    if (contactB.GetUserData() !== null) {
      if ((contactB.GetUserData().id === body.GetUserData().id) && (contactB.GetUserData().type === body.GetUserData().type)) {
        return true;
      }
    }
    return false;
  }
}
