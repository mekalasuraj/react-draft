import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: true,
    entry: {
        common: './src/client/common/js/common.js',
        home: './src/client/teacher/js/home.js',
        contact: './src/client/teacher/js/contact.js',
        contractAgreement: './src/client/teacher/js/contractAgreement.js',
        teacherApplication: './src/client/teacher/js/teacherApplication.js',
        teacherSignUp: './src/client/teacher/js/teacherSignUp.js',
        teacherAgreement: './src/client/teacher/js/teacherAgreement.js',
        schoolSignUp: './src/client/school/js/schoolSignUp.js',
        login: './src/client/common/js/login.js',
        forgotPassword: './src/client/common/js/forgotPassword.js',
        resetPassword: './src/client/common/js/resetPassword.js',
        schoolApplication: './src/client/school/js/schoolApplication.js',
        schoolContractAgreement: './src/client/school/js/schoolContractAgreement.js',
        teacherManageDocuments: './src/client/teacher/js/uploadDocuments/manageDocumentsApp.js',
        newSubstituteApp: './src/client/school/js/substitute/newSubstituteApp.js',
        adminSchoolSubstitute: './src/client/admin/js/adminSchoolSubstitute.js',
        manageTeachersApp: './src/client/admin/js/manageTeachersApp/App.js',
        substituteList: './src/client/school/js/substitute/substituteList.js',
        editTeacherApplication: './src/client/teacher/js/editTeacherApplication.js',
        editSchoolApplication: './src/client/school/js/editSchoolApplication.js',
        manageSubstitutesApp: './src/client/admin/js/manageSubstitutesApp.js',
        manageSchoolsApp:'./src/client/admin/js/manageSchoolsApp/App.js'
    },
    target: 'web',
    output: {
        path: './build/dist',
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: './build/dist'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, include: path.join(__dirname, 'src/client'), loaders: ['babel'] },
            { test: /(\.css)$/, loader: ExtractTextPlugin.extract('css?sourceMap') },
            { test: /\.(png|jpg)$/, exlude: /node_modules/, loader: 'url-loader?limit=100000' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
            { test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/, loader: 'url?prefix=font/&limit=5000'},
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
            { test: /\.json$/, loader: 'json-loader' }
        ]
    }
};
