import { Pagination, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  inventaryListAction,
  searchListAction,
  searchProcutAction,
  inputInventaryAction
} from '../../redux/actions/inventaryAction';
import AuditSearch from '../../components/audit/AuditSearch';
import AuditTable from '../../components/audit/AuditTable';
import TableHead from '../../components/common/TableHead';
import Layout from '../../hocs/Layout';
import { auditListAction } from '../../redux/actions/auditAction';
import {
  outputProviderAction,
  searchOutputTypeAction
} from '../../redux/actions/outputActions';

const tableHead: string[] = [
  'Clase',
  'Proveedor',
  'Color',
  'Insomo',
  'Referencia',
  'Talla',
  'U.M',
  'Saldo',
  'C. unidad',
  'C. total',
  'Fecha',
  'Descripcion',
  'Reposnsable'
];

interface auditListState {
  data: any;
  audit: any;
  search: any;
  client: any;
  search_product: any;
  searchProcutAction(product: string): void;
  outputProviderAction(): void;
  searchOutputTypeAction(client_output: string): void;
  auditListAction(
    aud_category: string,
    aud_provider: string,
    aud_product: string,
    aud_color: string,
    aud_size: string,
    aud_client: string,
    aud_output_type: string,
    aud_create_by: string,
    aud_until: string,
    aud_since: string,
    pageNext: number
  ): void;
}

const Audit: FC<auditListState> = (props) => {
  const {
    data,
    search,
    auditListAction,
    audit,
    search_product,
    searchProcutAction,
    outputProviderAction,
    searchOutputTypeAction,
    client
  } = props;

  const page = audit.pages;
  const datas = audit.data;
  const [aud_output_type, setOutputType] = useState('' as string);
  const [aud_provider, setProvider] = useState('' as string);

  const [formData, setFormData] = useState({
    aud_category: null,
    aud_provider: null,
    aud_product: null,
    aud_color: null,
    aud_size: null,
    aud_client: null,
    aud_output_type: null,
    aud_create_by: null,
    aud_until: null,
    aud_since: null,
    pageNext: null
  } as object);

  const {
    aud_category,
    aud_product,
    aud_color,
    aud_size,
    aud_client,
    aud_create_by,
    aud_until,
    aud_since,
    pageNext
  }: any = formData;

  useEffect(() => {
    window.scrollTo();
    searchListAction();
    outputProviderAction();
    auditListAction(
      aud_category,
      aud_provider,
      aud_product,
      aud_color,
      aud_size,
      aud_client,
      aud_output_type,
      aud_create_by,
      aud_until,
      aud_since,
      pageNext
    );
  }, [auditListAction]);

  const handleChangePage = (e: React.ChangeEvent<unknown>, page: number) => {
    const pageNext = page;
    auditListAction(
      aud_category,
      aud_provider,
      aud_product,
      aud_color,
      aud_size,
      aud_client,
      aud_output_type,
      aud_create_by,
      aud_until,
      aud_since,
      pageNext
    );
  };
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    auditListAction(
      aud_category,
      aud_provider,
      aud_product,
      aud_color,
      aud_size,
      aud_client,
      aud_output_type,
      aud_create_by,
      aud_until,
      aud_since,
      pageNext
    );
  };
  console.log(data);
  return (
    <Layout>
      <div className="row">
        <AuditSearch
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
                <h6 className="text-white text-capitalize ps-3">Inventario</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <table className="table align-items-center mb-0">
                  <TableHead itemsHead={tableHead} />
                  <AuditTable items={datas} />
                </table>
              </div>
              <div className="d-flex flex-row-reverse">
                <div className="p-2">
                  <Stack spacing={1}>
                    <Pagination onChange={handleChangePage} count={page} size="small" />
                  </Stack>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => ({
  audit: state.auditListReducer.data,
  data: state.outputReducer.data,
  client: state.outputReducer.client,
  search: state.inventaryReducer.search,
  search_product: state.inventaryReducer.product,
  result: state.outputReducer.result
});

export default connect(mapStateToProps, {
  auditListAction,
  searchListAction,
  searchOutputTypeAction,
  outputProviderAction,
  searchProcutAction
})(Audit);
