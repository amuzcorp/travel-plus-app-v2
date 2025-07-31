type ExtraWithoutEmpNumber = Omit<Partial<Account>, "empNumber">;

export class Account {
  id?: number;
  uuid?: string;
  token?: string;
  empNumber?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  metadata?: string;

  userEmail?: string;
  lastSignInUserNo?: string;
  nickName?: string;
  iconNick?: string;
  profileBg?: string;

  constructor(data: Partial<Account>) {
    this.id = data.id;
    this.uuid = data.uuid;
    this.token = data.token;
    this.empNumber = data.empNumber;
    this.name = data.name;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.deletedAt = data.deletedAt;
    this.metadata = data.metadata;

    this.userEmail = data.userEmail;
    this.lastSignInUserNo = data.lastSignInUserNo;
    this.nickName = data.nickName;
    this.iconNick = data.iconNick;
    this.profileBg = data.profileBg;
  }

  // 서버 응답 → Account 인스턴스
  static fromJson(json: any, extra?: ExtraWithoutEmpNumber): Account {
    return new Account({
      id: json.id,
      uuid: json.uuid,
      token: json.token,
      empNumber: json.emp_number, // 아뮤즈 서버 값 우선
      name: json.name,
      createdAt: json.created_at,
      updatedAt: json.updated_at,
      deletedAt: json.deleted_at,
      metadata: json.metadata,

      ...extra,
    });
  }

  // 서버 전송용 JSON
  toJson(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      token: this.token,
      emp_number: this.empNumber,
      name: this.name,
      created_at: this.createdAt,
      updated_at: this.updatedAt,
      deleted_at: this.deletedAt,
      metadata: this.metadata,
      //   user_email: this.userEmail,
      //   last_sign_in_user_no: this.lastSignInUserNo,
      //   nick_name: this.nickName,
      //   icon_nick: this.iconNick,
      //   profile_bg: this.profileBg,
    };
  }

  // Redux 저장용 JSON
  toReduxState(): Record<string, any> {
    return {
      id: this.id,
      uuid: this.uuid,
      token: this.token,
      empNumber: this.empNumber,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      metadata: this.metadata,

      userEmail: this.userEmail,
      lastSignInUserNo: this.lastSignInUserNo,
      nickName: this.nickName,
      iconNick: this.iconNick,
      profileBg: this.profileBg,
    };
  }

  //  Redux 복원
  static fromReduxState(state: any): Account {
    return new Account({ ...state });
  }

  // 로그인 여부
  private hasRequiredFields(): boolean {
    // 아뮤즈 서버에서 늘 오는 값을 기준으로 처리
    return [
      this.token,
      this.empNumber,
      this.id,
      this.uuid,
      this.createdAt,
      this.updatedAt,
    ].every((v) => v !== undefined && v !== null);
  }

  get isLoggedIn(): boolean {
    return this.hasRequiredFields();
  }

  // 로그아웃되면, 값 다 비우기
  static empty(): Account {
    return new Account({});
  }
}
