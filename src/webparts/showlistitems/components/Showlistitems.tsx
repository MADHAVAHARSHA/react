import * as React from 'react';
import styles from './Showlistitems.module.scss';
import { IShowlistitemsProps } from './IShowlistitemsProps';
import * as jquery from 'jquery';
import 'office-ui-fabric-react/dist/css/fabric.css';
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardPreview,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardLocation,
  DocumentCardType,
  DocumentCardImage,
  IDocumentCardStyles,
  IDocumentCardActivityPerson,
} from 'office-ui-fabric-react/lib/DocumentCard';

import "./App.css";
import {
  ActionButton,
  FontWeights,
  IButtonStyles,
  IIconProps,
  Icon,
  IIconStyles,
  Image,
  Persona,
  Stack,
  IStackTokens,
  Text,
  ITextStyles,
} from 'office-ui-fabric-react';
import {
  mergeStyleSets,
  ContextualMenu,
  Toggle,
  DefaultButton,
  IDragOptions,
  IconButton,
} from '@fluentui/react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { getTheme } from 'office-ui-fabric-react/lib/Styling';
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';

import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { hiddenContentStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';


const stackTokens: IStackTokens = { childrenGap: 20 };
const theme = getTheme();
const { palette, fonts } = theme;



export interface showlistitemsWPState {
  show: boolean,
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
  public constructor(props: IShowlistitemsProps, state: showlistitemsWPState) {
    super(props);
    this.state = {
      show: false,
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
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  public onClickHandler(evt: React.MouseEvent) {
    evt.preventDefault();

    this.setState(prev => ({
      show: !prev.show
    }));
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
      error: function (joXHR, textStatus, errorThrown) {
      }
    });
  }

  public render(): React.ReactElement<IShowlistitemsProps> {
    const siteTextStyles: ITextStyles = {
      root: {
        color: '#025F52',
        fontWeight: FontWeights.semibold,
      },
    };
    const descriptionTextStyles: ITextStyles = {
      root: {
        color: '#333333',
        fontWeight: FontWeights.semibold,
      },
    };
    const helpfulTextStyles: ITextStyles = {
      root: {
        color: '#333333',
        fontWeight: FontWeights.regular,
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
    const backgroundImageCardSectionStyles: ICardSectionStyles = {
      root: {
        backgroundImage: 'url(https://placehold.it/256x144)',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        height: 144,
      },
    };
    const dateTextStyles: ITextStyles = {
      root: {
        color: '#505050',
        fontWeight: 600,
      },
    };
    const subduedTextStyles: ITextStyles = {
      root: {
        color: '#666666',
      },
    };
    const actionButtonStyles: IButtonStyles = {
      root: {
        border: 'none',
        color: '#333333',
        height: 'auto',
        minHeight: 0,
        minWidth: 0,
        padding: 0,

        selectors: {
          ':hover': {
            color: '#0078D4',
          },
        },
      },
      textContainer: {
        fontSize: 12,
        fontWeight: FontWeights.semibold,
      },
    };
    const sectionStackTokens: IStackTokens = { childrenGap: 30 };
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const footerCardSectionTokens: ICardSectionTokens = { padding: '12px 0px 0px' };
    const backgroundImageCardSectionTokens: ICardSectionTokens = { padding: 12 };
    const agendaCardSectionTokens: ICardSectionTokens = { childrenGap: 0 };
    const attendantsCardSectionTokens: ICardSectionTokens = { childrenGap: 6 };
    const cardStyles: IDocumentCardStyles = {
      root: {},
    };
    const { show } = this.state;
    const styles = show ? "modal display" : "modal";
    return (
      <div>
        <button className="btn" onClick={this.onClickHandler} type="button">open modal</button>



        <Stack horizontal wrap>
          {
            this.state.listitems.map(function (listitems, listitemkey) {
              return (
                <Card style={{ margin: 4 }}
                  aria-label="Clickable vertical card with image bleeding at the center of the card"
                  tokens={cardTokens}

                >

                  <Card.Item fill>
                    <Image src={listitems.pic.Url} height={80} imageFit={ImageFit.cover} alt="Placeholder image." />
                  </Card.Item>
                  <Card.Section>
                    <Text variant="small" styles={siteTextStyles}>
                      {listitems.product}
                    </Text>
                  </Card.Section>
                  <Card.Section horizontal styles={footerCardSectionStyles} tokens={footerCardSectionTokens}>
                    <Icon iconName="AddFavorite" styles={iconStyles} />
                    <Icon iconName="SingleBookmark" styles={iconStyles} />
                    <Stack.Item grow={1}>
                      <span />
                    </Stack.Item>
                    <Icon iconName="MoreVertical" styles={iconStyles} />
                  </Card.Section>
                </Card>
              );

            })
          }
        </Stack>
        
      </div>


    );

  }
}
