import { Pagination, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import TableHead from '../../components/common/TableHead';
import OutputListTable from '../../components/ouputInventary/OutputListTable';
import OutputSearch from '../../components/ouputInventary/OutputSearch';
import Layout from '../../hocs/Layout';
import {
  searchListAction,
  inventaryListAction,
  searchProcutAction
} from '../../redux/actions/inventaryAction';
import {
  outputListAction,
  outputProviderAction,
  searchOutputTypeAction,
  inputInventaryTypeAction
} from '../../redux/actions/outputActions';

const MySwal = withReactContent(Swal);

const tableHead: string[] = [
  'Salio a',
  'Cliente',
  'Clase',
  'Proveedor',
  'Color',
  'cod. Color',
  'Insomo',
  'Referencia',
  'Talla',
  'U.M',
  'Saldo',
  'C. unidad',
  'C. total',
  'Fecha',
  ''
];

interface outputListState {
  list: any;
  data: any;
  client: any;
  search: any;
  result: any;
  search_product: any;
  searchListAction(): void;
  outputProviderAction(): void;
  searchProcutAction(product: string): void;
  inputInventaryTypeAction(id: number): void;
  searchOutputTypeAction(client_output: string): void;
  outputListAction(
    oi_category: string,
    oi_provider: string,
    oi_product: string,
    oi_color: string,
    oi_size: string,
    oi_client: string,
    oi_output_type: string,
    oi_until: string,
    oi_since: string,
    pageNext: number
  ): void;
}

const OutputInevtaryList: FC<outputListState> = (props) => {
  const {
    list,
    data,
    client,
    search,
    result,
    search_product,
    outputListAction,
    searchListAction,
    outputProviderAction,
    inputInventaryTypeAction,
    searchOutputTypeAction,
    searchProcutAction
  } = props;

  const [formData, setFormData] = useState({
    oi_category: null,
    oi_provider: null,
    oi_product: null,
    oi_color: null,
    oi_size: null,
    oi_client: null,
    oi_output_type: null,
    oi_until: null,
    oi_since: null,
    pageNext: null
  } as object);

  const {
    oi_category,
    oi_product,
    oi_color,
    oi_size,
    oi_client,
    oi_until,
    oi_since,
    pageNext
  }: any = formData;
  const [oi_output_type, setOutputType] = useState('' as string);
  const [oi_provider, setProvider] = useState('' as string);

  const page = list.pages;
  const datas = list.data;

  useEffect(() => {
    if (result.data === true) {
      MySwal.fire({
        title: 'Bien hecho! ',
        icon: 'success',
        text: 'Acaba de ingresar el producto.'
      });
      result.data = false;
    }
    outputProviderAction();
    searchListAction();
    outputListAction(
      oi_category,
      oi_provider,
      oi_product,
      oi_color,
      oi_size,
      oi_client,
      oi_output_type,
      oi_until,
      oi_since,
      pageNext
    );
  }, [outputListAction, outputProviderAction, result]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    const pageNext = page;
    outputListAction(
      oi_category,
      oi_provider,
      oi_product,
      oi_color,
      oi_size,
      oi_client,
      oi_output_type,
      oi_until,
      oi_since,
      pageNext
    );
  };

  const handleChangeProviver = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchProcutAction(e.target.value);
    if (!e.target.value) {
      setFormData({ inv_product: null });
    }

    setProvider(e.target.value);
  };

  const handleChangeoutputType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    searchOutputTypeAction(e.target.value);
    setOutputType(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    outputListAction(
      oi_category,
      oi_provider,
      oi_product,
      oi_color,
      oi_size,
      oi_client,
      oi_output_type,
      oi_until,
      oi_since,
      pageNext
    );
  };
  const handleClick = (id: number) => {
    inputInventaryTypeAction(id);
  };

  return (
    <Layout>
      <div className="row">
        <OutputSearch
          itemSearch={search}
          itemOutputSearch={data}
          itemClient={client}
          onChangeoutputType={handleChangeoutputType}
          onChangeProvider={handleChangeProviver}
          onChange={handleChange}
          onSubmit={handleOnSubmit}
          searchProduct={search_product}
        />
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">Salidas</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <TableHead itemsHead={tableHead} />
                  <OutputListTable
                    items={datas}
                    onClick={(id: number) => handleClick(id)}
                  />
                  <tfoot className="container">
                    <div className=" justify-content-end">
                      <Stack spacing={1}>
                        <Pagination
                          onChange={handleChangePage}
                          count={page}
                          size="small"
                        />
                      </Stack>
                    </div>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  list: state.outputReducer.list,
  data: state.outputReducer.data,
  client: state.outputReducer.client,
  search: state.inventaryReducer.search,
  search_product: state.inventaryReducer.product,
  result: state.outputReducer.result
});

export default connect(mapStateToProps, {
  inventaryListAction,
  outputListAction,
  searchListAction,
  searchOutputTypeAction,
  searchProcutAction,
  outputProviderAction,
  inputInventaryTypeAction
})(OutputInevtaryList);
