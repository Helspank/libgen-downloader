import CONFIG from '../config';
import CONSTANTS from '../constants';

import { Interfaces } from '../interfaces.namespace';
import { 
    UIInterfaces, 
    UITypes,

    Listing,
    List,

    Dropdown,
    DropdownList
} from '../../ui';

export default abstract class {
    public static buildTitle(title: string, ext: string, pageNumber: number, index: number): string {
        let orderNumber: number = (pageNumber - 1) * CONFIG.RESULTS_PAGE_SIZE + index + 1;
        let orderTitle: string = `[${orderNumber}]`;

        let titleBody: string = ` [${ext}] ${title}`;

        let finalTitle = `${orderTitle}${titleBody}`;

        if (finalTitle.length > CONFIG.TITLE_MAX_STRLEN) {
            finalTitle = finalTitle.substr(0, CONFIG.TITLE_MAX_STRLEN - 3) + '...';
        }
        
        return finalTitle;
    }

    public static createListing(text: string, value: string, actionID: string, 
                                color: UITypes.color, hovercolor: UITypes.color): UITypes.Listing {
        return new Listing({
            text,
            value,
            actionID,

            color,
            hovercolor
        });
    }

    public static createList(entries: Interfaces.Entry[]): List {
        let listings: UITypes.Listing[] = entries.map((e: Interfaces.Entry, i: number) => (
           this.createListing(e.Title, e.ID, ' ', 'white', 'cyan') 
        ))

        let list: List = new List();

        list.attachListingArr(listings, CONFIG.UI_PAGE_SIZE);

        return list;
    }

    public static createDropdownList(entries: Interfaces.Entry[]): DropdownList {
        let listings: Dropdown[] = entries.map((e: Interfaces.Entry) => {
            let sublistings: UITypes.Listing[] = [];

            sublistings.push(this.createListing('See Details', e.ID, ' ', 'bwhite', 'byellow'));
            sublistings.push(this.createListing('Download Directly', e.ID, ' ', 'bwhite', 'byellow'));
            sublistings.push(this.createListing('Add to Bul Download Queue', e.ID, ' ', 'bwhite', 'byellow'));
            sublistings.push(this.createListing('See Details', e.ID, ' ', 'bwhite', 'byellow'));
            sublistings.push(this.createListing('Download Directly', e.ID, ' ', 'bwhite', 'byellow'));
            sublistings.push(this.createListing('Add to Bul Download Queue', e.ID, ' ', 'bwhite', 'byellow'));

            let sublist: List = new List(1);

            sublist.attachListingArr(sublistings, sublistings.length);

            let dropdown: Dropdown = new Dropdown({
                text: e.Title,
                value: e.ID,
                actionID: ' ',

                color: 'white',
                hovercolor: 'bcyan'
            });

            dropdown.attachSublist(sublist);

            return dropdown;
        });

        let dropdownList: DropdownList = new DropdownList();

        dropdownList.attachListingArr(listings, CONFIG.UI_PAGE_SIZE);

        return dropdownList;
    }

  //  public static getListObject(entries: Interfaces.Entry[], pageNumber: number): UIInterfaces.ListObject {
  //      return {
  //          type: 'list',
  //          bulkDownloadOption: true,
  //          listedItemCount: CONFIG.UI_PAGE_SIZE,
  //          listings: this.getListingObjectArr(entries, pageNumber)
  //      }
  //  }

  //  private static getListingObjectArr(
  //      entries: Interfaces.Entry[], 
  //      pageNumber: number): UIInterfaces.ListingObject[] {

  //      let listingObjects: UIInterfaces.ListingObject[];

  //      listingObjects = entries.map((e: Interfaces.Entry, i: number) => {
  //          let title: string = this.buildTitle(e.Title, e.Ext, pageNumber, i);

  //          return this.getEntryListingObject(title, i, e.ID);
  //      });

  //      return listingObjects;
  //  }

  //  private static getEntryListingObject(title: string, index: number, id: string): UIInterfaces.ListingObject {
  //      return {
  //          text: title,
  //          value: id.toString(),

  //          submenu: [
  //              {
  //                  text: CONSTANTS.SEE_DETAILS_LISTING.SEE_DETAILS,
  //                  actionID: CONSTANTS.SEE_DETAILS_LISTING.SEE_DETAILS_RES_VAL,
  //                  value: index.toString(),
  //                  isSubmenuListing: true,
  //                  isCheckable: false
  //              },

  //              {
  //                  text: CONSTANTS.DOWNLOAD_LISTING.DOWNLOAD_DIRECTLY,
  //                  actionID: CONSTANTS.DOWNLOAD_LISTING.DOWNLOAD_RES_VAL,
  //                  value: index.toString(),
  //                  isSubmenuListing: true,
  //                  isCheckable: false
  //              }
  //          ],

  //          isSubmenuListing: false,
  //          isSubmenuOpen: false,
  //          isCheckable: true,
  //          checkBtnText: CONSTANTS.SUBMENU_LISTINGS.CHECK,
  //          unCheckBtnText: CONSTANTS.SUBMENU_LISTINGS.UNCHECK,
  //          submenuToggleBtnText: CONSTANTS.SUBMENU_LISTINGS.CLOSEBTN
  //      }
  //  }

  //  public static getOptionListingObject(title: string, actionID: string, val: string = ''): UIInterfaces.ListingObject {
  //      return {
  //          text: title,
  //          value: val,
  //          actionID: actionID,
  //          isSubmenuListing: false,
  //          isCheckable: false
  //      }
  //  }

  //  public static getEntryDetailsListObject(entryIndex: number, entryCheckStatus: boolean): UIInterfaces.ListObject {
  //      let listings: UIInterfaces.ListingObject[] = this.getEntryDetailListingObjectArr(entryIndex, entryCheckStatus);
  //      
  //      return {
  //          type: 'list',
  //          bulkDownloadOption: false,
  //          listedItemCount: listings.length,
  //          listings
  //      }
  //  }

  //  private static getEntryDetailListingObjectArr(entryIndex: number, entryCheckStatus: boolean): UIInterfaces.ListingObject[] {
  //      let listings: UIInterfaces.ListingObject[] = [];

  //      listings.push(this.getOptionListingObject(
  //          CONSTANTS.TURN_BACK_LISTING.TURN_BACK,
  //          CONSTANTS.TURN_BACK_LISTING.TURN_BACK_RESULT_ID
  //      ));

  //      listings.push(this.getOptionListingObject(
  //          CONSTANTS.DOWNLOAD_LISTING.DOWNLOAD,
  //          CONSTANTS.DOWNLOAD_LISTING.DOWNLOAD_RES_VAL,
  //          entryIndex.toString()
  //      ));

  //      listings.push(this.getOptionListingObject(
  //          entryCheckStatus ? 
  //              CONSTANTS.ENTRY_DETAILS_CHECK.ENTRY_DETAILS_CHECK_REMOVE : 
  //              CONSTANTS.ENTRY_DETAILS_CHECK.ENTRY_DETAILS_CHECK_ADD,
  //          CONSTANTS.ENTRY_DETAILS_CHECK.ENTRY_DETAILS_CHECK_RES_VAL,
  //          entryIndex.toString()
  //      ));

  //      return listings;
  //  }

  //  public static getAfterDownloadListObject(): UIInterfaces.ListObject {
  //      let listings: UIInterfaces.ListingObject[] = this.getAfterDownloadListingObjectArr();
  //      return {
  //          type: 'list',
  //          bulkDownloadOption: false,
  //          listedItemCount: listings.length,
  //          listings
  //      }
  //  }

  //  private static getAfterDownloadListingObjectArr(): UIInterfaces.ListingObject[] {
  //      let listings: UIInterfaces.ListingObject[] = [];

  //      listings.push(this.getOptionListingObject(
  //          CONSTANTS.TURN_BACK_LISTING.TURN_BACK,
  //          CONSTANTS.TURN_BACK_LISTING.TURN_BACK_RESULT_ID
  //      ));

  //      listings.push(this.getOptionListingObject(
  //          CONSTANTS.EXIT.EXIT,
  //          CONSTANTS.EXIT.EXIT_RESULT_ID
  //      ));

  //      return listings;
  //  }

  //  public static getSearchAnotherListObject(): UIInterfaces.ListObject {
  //      let listings: UIInterfaces.ListingObject[] = this.getSearchAnotherListingObjectArr();

  //      return {
  //          type: 'list',
  //          bulkDownloadOption: false,
  //          listedItemCount: listings.length,
  //          listings
  //      }
  //  }

  //  private static getSearchAnotherListingObjectArr(): UIInterfaces.ListingObject[] {
  //      let listings: UIInterfaces.ListingObject[] = [];

  //      listings.push(this.getOptionListingObject(
  //          CONSTANTS.SEARCH_ANOTHER_LISTINGS.SEARCH_ANOTHER,
  //          CONSTANTS.SEARCH_ANOTHER_LISTINGS.SEARCH_ANOTHER_RESULT_ID
  //      ));

  //      listings.push(this.getOptionListingObject(
  //          CONSTANTS.EXIT.EXIT,
  //          CONSTANTS.EXIT.EXIT_RESULT_ID
  //      ));

  //      return listings;
  //  }
}
