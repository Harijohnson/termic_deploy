# Generated by Django 4.2.7 on 2024-01-29 16:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0012_alter_product_digitalresource'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='digitalResource',
        ),
    ]
