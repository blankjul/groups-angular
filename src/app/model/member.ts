
export class Member {

  public name: string;
  public preferences: Set<Member> = new Set<Member>();
  public rejections: Set<Member> = new Set<Member>();

  constructor(name: string) {
    this.name = name;
  }

  public toString() {
    return this.name;
  }

  public prefers(member:Member) {
    return this.preferences.has(member);
  }

  public rejects(member:Member) {
    return this.rejections.has(member);
  }


}
