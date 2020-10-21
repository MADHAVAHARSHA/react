import * as React from 'react';
import { IShowlistitemsProps } from './IShowlistitemsProps';
import * as jquery from 'jquery';
import 'office-ui-fabric-react/dist/css/fabric.css';
import "./App.css";
import {
  FontWeights,
  Icon,
  IIconStyles,
  Image,
  Stack,
  Text,
  ITextStyles,
  Modal,
  IIconProps,
  IconButton,
} from 'office-ui-fabric-react';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';

export interface showlistitemsWPState {
  showModal: boolean,
  modalData: any,
  listitems: [
    {
      "customer_name": "",
      "product": "",
      "total_amount": "",
      "Id": "",
      "image": "",
      "pic": {
        "Url": "",
        "Description": ""
      }
    }
  ]
}

export default class Showlistitems extends React.Component<IShowlistitemsProps, showlistitemsWPState> {
  static siteurl: string = "";
  public constructor(props: IShowlistitemsProps) {
    super(props);
    this.state = {
      showModal: false,
      modalData: null,
      listitems: [
        {
          "customer_name": "",
          "product": "",
          "total_amount": "",
          "Id": "",
          "image": "",
          "pic": {
            "Url": "",
            "Description": ""
          }
        }
      ]
    };
    Showlistitems.siteurl = this.props.websiteurl;
  }

  public componentDidMount() {
    let reactcontexthandler = this;
    jquery.ajax({
      url: `${Showlistitems.siteurl}/_api/web/lists/getbytitle('orders_data')/items?select=product,pic,total_amount`,
      type: "GET",
      headers: { 'Accept': 'application/json;odata=verbose;' },
      success: function (resultData) {
        console.log(resultData.d.results)
        reactcontexthandler.setState({
          listitems: resultData.d.results
        });
      },
      error: function () {
      }
    });
  }

  private _setShowModal = (item: any): void => {
    this.setState({ showModal: true });
    this.setState({ modalData: item }, () => console.log(this.state.modalData));
  }

  private handleModalDismiss = () => {
    this.setState({ showModal: false, modalData: null });
  }

  public render(): React.ReactElement<IShowlistitemsProps> {
    const siteTextStyles: ITextStyles = {
      root: {
        fontWeight: FontWeights.semibold,
      },
    };
    const iconStyles: IIconStyles = {
      root: {
        color: '#0078D4',
        fontSize: 16,
        fontWeight: FontWeights.regular,
      },
    };
    const footerCardSectionStyles: ICardSectionStyles = {
      root: {
        borderTop: '1px solid #F3F2F1',
      },
    };
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const footerCardSectionTokens: ICardSectionTokens = { padding: '12px 0px 0px' };
    const moreVertical: IIconProps = { iconName: 'MoreVertical' };
    return (
      <div>
        <Stack horizontal wrap>
          {
            this.state.listitems.map((listitem) =>
              <Card style={{ margin: 4 }}
                aria-label="Clickable vertical card with image bleeding at the center of the card"
                tokens={cardTokens}
              >
                <Card.Item fill>
                  <Image src={listitem.pic.Url} height={80} imageFit={ImageFit.cover} alt="Placeholder image." />
                </Card.Item>
                <Card.Section>
                  <Text variant="small" styles={siteTextStyles}>
                    {listitem.product}
                  </Text>
                </Card.Section>
                <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
                  <Icon iconName="AddFavorite" styles={iconStyles} />
                  <Icon iconName="SingleBookmark" styles={iconStyles} />
                  <Stack.Item grow={1}>
                    <span />
                  </Stack.Item>
                  <IconButton iconProps={{ iconName: "MoreVertical" }} onClick={() => this._setShowModal(listitem)} />
                </Card.Section>
              </Card>
            )
          }
        </Stack>
        {this.state.modalData ?
          <Modal
            isOpen={this.state.showModal}
            onDismiss={this.handleModalDismiss}
          >
            <Card style={{ margin: 4 }}
              aria-label="Clickable vertical card with image bleeding at the center of the card"
              tokens={cardTokens}
            >
              <Card.Item fill>
                <Image src={this.state.modalData.pic.Url} height={80} imageFit={ImageFit.cover} alt="Placeholder image." />
              </Card.Item>
              <Card.Section>
                <Text variant="small" styles={siteTextStyles}>
                  {this.state.modalData.product}
                </Text>
              </Card.Section>
              <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
                <Icon iconName="AddFavorite" styles={iconStyles} />
                <Icon iconName="SingleBookmark" styles={iconStyles} />
                <Stack.Item grow={1}>
                  <span />
                </Stack.Item>
                <IconButton iconProps={{ iconName: "MoreVertical" }} onClick={() => this._setShowModal(this.state.modalData)} />
              </Card.Section>
            </Card>
          </Modal>
          : null}
      </div >
    );
  }


}
