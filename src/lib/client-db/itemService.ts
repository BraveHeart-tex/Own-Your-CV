import { UpdateSpec } from 'dexie';
import { clientDb } from './clientDb';
import {
  DEX_Field,
  DEX_InsertItemModel,
  DEX_Item,
  DEX_Section,
} from './clientDbSchema';

class ItemService {
  static async deleteItem(itemId: DEX_Item['id']) {
    return clientDb.transaction(
      'rw',
      [clientDb.items, clientDb.fields],
      async () => {
        await clientDb.items.delete(itemId);
        await clientDb.fields.where('itemId').equals(itemId).delete();
      },
    );
  }

  static async bulkUpdateItems(
    keysAndChanges: { key: DEX_Item['id']; changes: UpdateSpec<DEX_Item> }[],
  ) {
    return clientDb.items.bulkUpdate(keysAndChanges);
  }

  static async addItemFromTemplate(
    template: DEX_InsertItemModel & {
      fields: Omit<DEX_Field, 'id' | 'itemId'>[];
    },
  ): Promise<{ item: DEX_Item; fields: DEX_Field[] }> {
    return clientDb.transaction(
      'rw',
      [clientDb.items, clientDb.fields],
      async () => {
        const itemId = await clientDb.items.add({
          sectionId: template.sectionId,
          containerType: template.containerType,
          displayOrder: template.displayOrder,
        });

        const fieldsPayload = template.fields.map((field) => ({
          ...field,
          itemId,
        }));

        const fieldIds = await clientDb.fields.bulkAdd(fieldsPayload, {
          allKeys: true,
        });

        return {
          item: {
            id: itemId,
            sectionId: template.sectionId,
            containerType: template.containerType,
            displayOrder: template.displayOrder,
          },
          fields: fieldsPayload.map((field, index) => ({
            ...field,
            id: fieldIds[index],
            itemId,
          })) as DEX_Field[],
        };
      },
    );
  }

  static async getItemsWithSectionIds(
    sectionIds: DEX_Section['id'][],
  ): Promise<DEX_Item[]> {
    return clientDb.items.where('sectionId').anyOf(sectionIds).toArray();
  }

  static async getItemIdsBySectionIds(
    sectionIds: DEX_Section['id'][],
  ): Promise<DEX_Item['id'][]> {
    return clientDb.items.where('sectionId').anyOf(sectionIds).primaryKeys();
  }

  static async bulkDeleteItems(itemIds: DEX_Item['id'][]): Promise<void> {
    return clientDb.items.bulkDelete(itemIds);
  }
}

export default ItemService;
