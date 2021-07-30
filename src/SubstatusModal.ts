import { App, FuzzySuggestModal } from 'obsidian';
import { Substatus, getSettings } from 'Settings';

export class SubstatusModal extends FuzzySuggestModal<number> {
    public readonly onChooseItem: (substatusIndex: number) => void;

    constructor({
        app,
        onChooseItem,
    }: {
        app: App;
        onChooseItem: (substatusIndex: number) => void;
    }) {
        super(app);

        this.onChooseItem = (substatusIndex: number) => {
            onChooseItem(substatusIndex);
            this.close();
        };
    }

    getItems(): number[] {
        const substatuses = getSettings().substatuses.map(
            (_: Substatus, substatusIndex) => {
                return substatusIndex;
            },
        );
        return substatuses;
    }

    getItemText(substatusIndex: number): string {
        const substatusName =
            getSettings().substatuses[substatusIndex].name ||
            `(Untitled Substatus ${substatusIndex}`;
        return substatusName;
    }
}
