export class ChannelEntity {

 constructor(public name: string,
             public icon: string,
             public route: string,
             public description: string,
             public channelSource: string,
             public channelId: string,
             public palette: string[],
             public id: string) {}
}
