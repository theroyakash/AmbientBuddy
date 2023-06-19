#include<iostream>
using namespace std;
int main(){
    string file_name ;
    cin >> file_name ;
    cout << "\"id\": \""<< file_name << "\"," << endl;
    cout << "\"audio_id\": \""<< file_name <<"_audio"<< "\"," << endl;
    cout << "\"src\": \""<< "./audio/"<<file_name <<".wav"<< "\"," << endl;
    cout << "\"volume_input\": \""<< file_name <<"_volume_control"<< "\"," << endl;
    cout << "\"button_id\": \""<< file_name<<"_audio_button" <<"_volume_control"<< "\"" << endl;
}