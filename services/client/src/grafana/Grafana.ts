export default class Grafana {
    static graphs = {
        'A': {
            movement: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9519/room-a?orgId=1&refresh=30s&theme=light&panelId=3',
            temperature: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9519/room-a?orgId=1&refresh=30s&theme=light&panelId=1',
            air: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9519/room-a?orgId=1&refresh=30s&theme=light&panelId=2'
        },
        'B': {
            movement: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9520/room-b?orgId=1&refresh=30s&theme=light&panelId=3',
            temperature: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9520/room-b?orgId=1&refresh=30s&theme=light&panelId=1',
            air: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9520/room-b?orgId=1&refresh=30s&theme=light&panelId=2'
        },
        'C': {
            movement: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9521/room-c?orgId=1&refresh=30s&theme=light&panelId=3',
            temperature: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9521/room-c?orgId=1&refresh=30s&theme=light&panelId=1',
            air: 'http://localhost:3000/d-solo/c1e6b704-503c-4855-a6d0-4bc9f61d9521/room-c?orgId=1&refresh=30s&theme=light&panelId=2'
        },
    }


}
