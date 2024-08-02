export interface Root {
    count: number
    next: string
    previous: null
    results: Monster[]
  }
  
  export default interface Monster {
    slug: string
    desc: string
    name: string
    size: string
    type: string
    subtype: string
    group: string
    alignment: string
    armor_class: number
    armor_desc?: string | null
    hit_points: number
    hit_dice: string
    speed: Speed
    strength: number
    dexterity: number
    constitution: number
    intelligence: number
    wisdom: number
    charisma: number
    strength_save: null
    dexterity_save: null
    constitution_save: null
    intelligence_save: null
    wisdom_save: null
    charisma_save: null
    perception?: number | null
    skills: Skills
    damage_vulnerabilities: string
    damage_resistances: string
    damage_immunities: string
    condition_immunities: string
    senses: string
    languages: string
    challenge_rating: string
    cr: number
    actions: Action[]
    bonus_actions: null
    reactions: null
    legendary_desc: string
    legendary_actions: null
    special_abilities?: SpecialAbility[] | null
    spell_list: null[]
    page_no: number
    environments: string[]
    img_main: null
    document__slug: string
    document__title: string
    document__license_url: string
    document__url: string
  }
  
  export interface Speed {
    walk?: number | null
    swim?: number | null
    climb?: number | null
    fly?: number | null
    burrow?: number | null
    hover?: number | null
  }
  
  export interface Skills {
    [key: string]: number | undefined | null
  }
  
  export interface Action {
    name: string
    desc: string
    attack_bonus?: number | null
    damage_dice?: string | null
    damage_bonus?: number | null
  }
  
  export interface SpecialAbility {
    name: string
    desc: string
    attack_bonus?: number | null
    damage_dice?: string | null
    damage_bonus?: number | null
  }
  